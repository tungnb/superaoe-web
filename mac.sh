#!/bin/bash
# Cai SuperAqE cho MacBook (chip Apple M1 tro len hoac chip Intel). Dan dong nay vao Terminal roi bam Enter:
#   curl -fsSL https://superaqe.com/mac.sh | bash
# Tai goi dung loai chip (SuperAoE_Mac_M.zip hoac SuperAoE_Mac_Intel.zip: SuperAoE.app kem Wine +
# game), giai nen vao thu muc tam roi chay file .command trong do: cai Rosetta 2 neu may chip M
# thieu, chep SuperAoE.app vao Applications, mo app.
# File tai bang curl khong bi macOS gan co "quarantine", nen khong co canh bao "Apple khong the
# xac minh". Ca script nam trong ham main de bash doc het truoc khi chay (an toan khi qua pipe).
set -euo pipefail

main() {
  if [ "$(uname -s)" != Darwin ]; then
    echo "Lenh nay danh cho MacBook. Ban Windows va Linux tai o superaqe.com."
    exit 1
  fi
  local url
  case "$(uname -m)" in
    arm64) url=https://superaqe.com/download/mac ;;
    # A Terminal opened with Rosetta on Apple Silicon reports x86_64 too; it still gets the arm64 app.
    x86_64) if [ "$(sysctl -in sysctl.proc_translated)" = 1 ]; then url=https://superaqe.com/download/mac
            else url=https://superaqe.com/download/mac-intel; fi ;;
    *) echo "Loai chip nay chua ho tro: $(uname -m)"; exit 1 ;;
  esac
  # Electron 33 needs macOS 11 Big Sur or newer.
  if [ "$(sw_vers -productVersion | cut -d. -f1)" -lt 11 ]; then
    echo "SuperAqE can macOS 11 (Big Sur) tro len. May nay dang chay macOS $(sw_vers -productVersion)."
    exit 1
  fi
  # Global, not local: the EXIT trap runs after main has returned.
  tmp=$(mktemp -d "${TMPDIR:-/tmp}/superaoe.XXXXXX")
  trap 'rm -rf "$tmp"' EXIT

  echo "Dang tai SuperAqE (khoang 300 MB, vai phut tuy mang)..."
  curl -fL --retry 3 --progress-bar -o "$tmp/SuperAoE_Mac.zip" "$url"
  echo "Dang giai nen..."
  ditto -x -k "$tmp/SuperAoE_Mac.zip" "$tmp"
  rm -f "$tmp/SuperAoE_Mac.zip"

  local installer
  installer=$(ls "$tmp"/SuperAoE_Mac_*/*.command 2>/dev/null | head -n 1)
  [ -n "$installer" ] || { echo "Goi tai ve bi loi (khong thay file cai). Chay lai lenh nay."; exit 1; }
  bash "$installer"
}

main "$@"

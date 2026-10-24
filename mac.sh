#!/bin/bash
# Cai SuperAoE cho MacBook chip Apple (M1 tro len). Dan dong nay vao Terminal roi bam Enter:
#   curl -fsSL https://superaoe.com/mac.sh | bash
# Tai SuperAoE_Mac_M.zip (SuperAoE.app kem Wine + game), giai nen vao thu muc tam roi chay
# file .command trong do: cai Rosetta 2 neu thieu, chep SuperAoE.app vao Applications, mo app.
# File tai bang curl khong bi macOS gan co "quarantine", nen khong co canh bao "Apple khong the
# xac minh". Ca script nam trong ham main de bash doc het truoc khi chay (an toan khi qua pipe).
set -euo pipefail

main() {
  if [ "$(uname -s)" != Darwin ] || [ "$(uname -m)" != arm64 ]; then
    echo "SuperAoE cho Mac chi chay tren MacBook chip Apple (M1, M2, M3, M4...). Mac chip Intel chua ho tro."
    exit 1
  fi
  # Global, not local: the EXIT trap runs after main has returned.
  tmp=$(mktemp -d "${TMPDIR:-/tmp}/superaoe.XXXXXX")
  trap 'rm -rf "$tmp"' EXIT

  echo "Dang tai SuperAoE (khoang 300 MB, vai phut tuy mang)..."
  curl -fL --retry 3 --progress-bar -o "$tmp/SuperAoE_Mac_M.zip" https://superaoe.com/download/mac
  echo "Dang giai nen..."
  ditto -x -k "$tmp/SuperAoE_Mac_M.zip" "$tmp"
  rm -f "$tmp/SuperAoE_Mac_M.zip"

  local installer
  installer=$(ls "$tmp"/SuperAoE_Mac_M/*.command 2>/dev/null | head -n 1)
  [ -n "$installer" ] || { echo "Goi tai ve bi loi (khong thay file cai). Chay lai lenh nay."; exit 1; }
  bash "$installer"
}

main "$@"

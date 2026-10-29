#!/bin/bash
# Cai SuperAqE cho Linux 64-bit (Ubuntu, Linux Mint, Debian, Fedora...). Mo Terminal (Ctrl+Alt+T),
# dan dong nay roi bam Enter:
#   curl -fsSL https://superaqe.com/linux.sh | bash
# Tai SuperAoE_Linux.tar.xz (SuperAqE kem Wine + game), giai nen vao thu muc tam roi chay
# install.sh trong do: cai vao ~/.local/share/SuperAoE (khong can sudo), them vao menu ung dung,
# mo app. Ca script nam trong ham main de bash doc het truoc khi chay (an toan khi qua pipe).
set -euo pipefail

main() {
  if [ "$(uname -s)" != Linux ] || [ "$(uname -m)" != x86_64 ]; then
    echo "SuperAqE cho Linux chi chay tren may 64-bit Intel / AMD (x86_64)."
    exit 1
  fi
  command -v xz >/dev/null 2>&1 || { echo "Can xz de giai nen: sudo apt install xz-utils (hoac dnf install xz) roi chay lai."; exit 1; }
  # Global, not local: the EXIT trap runs after main has returned.
  tmp=$(mktemp -d "${TMPDIR:-/tmp}/superaoe.XXXXXX")
  trap 'rm -rf "$tmp"' EXIT

  echo "Dang tai SuperAqE (khoang 300 MB, vai phut tuy mang)..."
  curl -fL --retry 3 --progress-bar -o "$tmp/SuperAoE_Linux.tar.xz" https://superaqe.com/download/linux
  echo "Dang giai nen..."
  tar -xJf "$tmp/SuperAoE_Linux.tar.xz" -C "$tmp"
  rm -f "$tmp/SuperAoE_Linux.tar.xz"

  [ -f "$tmp/SuperAoE_Linux/install.sh" ] || { echo "Goi tai ve bi loi (khong thay install.sh). Chay lai lenh nay."; exit 1; }
  bash "$tmp/SuperAoE_Linux/install.sh"
}

main "$@"

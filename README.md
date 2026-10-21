# SuperAoE website

Trang giới thiệu SuperAoE: chơi Đế Chế (AoE1 Rise of Rome) online, xem trực tiếp, lưu và xem lại replay, bản Windows và MacBook.

Trang tĩnh một file (`index.html`), không cần build.

## Xem trên máy
Mở `index.html` bằng trình duyệt, hoặc:
```
npx serve .
```

## Link tải
Sửa ở đầu thẻ `<script>` cuối `index.html`:
- `WIN_URL`: link SuperAoE.zip cho Windows.
- `MAC_URL`: link bản Mac. Để trống thì nút Mac hiện "Bản Mac sắp phát hành".

## Deploy (Cloudflare, static assets)
```
npx wrangler deploy
```
Các file không public (.git, .wrangler, README...) được liệt kê trong `.assetsignore`.

# Nhật ký SEO

## 2026-10-21
- Tạo agent SEO (`.claude/agents/seo-agent.md`), danh sách từ khóa, lịch chạy hằng ngày.
- Cần chủ dự án quyết định: trang chủ đang nói "mỗi trận được lưu thành replay" và có bản MacBook, trong khi replay chưa có trong launcher và bản Mac chưa test trên Mac thật.
- Cần chủ dự án làm: xác minh superaoe.com trong Google Search Console và Bing Webmaster Tools, gửi sitemap.

## 2026-10-21 (vòng SEO 1)
- Kỹ thuật: thêm `robots.txt` (cho phép mọi bot, kể cả GPTBot/ClaudeBot/PerplexityBot…, có Sitemap), `sitemap.xml`, `llms.txt`, file khóa IndexNow (`seo/indexnow.md`), `seo/facts.md`.
- Trang chủ: title chứa từ khóa ("SuperAoE – Chơi Đế Chế (AoE) online miễn phí"), og:locale/site_name, twitter card, JSON-LD Organization + WebSite + SoftwareApplication (Windows, giá 0, downloadUrl), logo trỏ "/", link nội bộ tới trang mới. KHÔNG thêm FAQPage cho trang chủ vì FAQ trang chủ có câu về replay/Mac chưa đúng.
- Trang mới: /choi-aoe-online-mien-phi/ (trả lời thẳng, 5 bước, bảng so sánh, 6 câu FAQ, BreadcrumbList + FAQPage + HowTo).
- Off-page: nháp `seo/outreach/2026-10-21-facebook-group.md`.
- Đo hạng (ước lượng, WebSearch): superaoe.com chưa xuất hiện cho mọi từ khóa chính; xem `seo/rankings.md`.
- Ghi chú: robots.txt live trước đây là robots do Cloudflare quản lý (chỉ có comment content-signals). Nếu sau deploy vẫn thấy robots Cloudflare, cần kiểm tra cài đặt "Managed robots.txt / AI bots" trên Cloudflare.
- Lần sau: trang /choi-aoe-co-khan-gia/ (spectator), rồi /choi-aoe-tren-macbook/ (viết đúng là "sắp phát hành"); đo hạng lại ngày 2026-10-28.

### Cần chủ dự án quyết định
- Trang chủ vẫn nói quá: "mỗi trận được lưu thành replay", mục #replay (lưu tự động `.aoerep` trong launcher), FAQ replay, thẻ "Có bản cho MacBook", meta description "Có bản cho Windows và MacBook", mục MacBook ("Đủ cả khán giả và replay"). Replay chưa có trong launcher và bản Mac chưa test thật → nên sửa hoặc ghi "sắp có". Agent không tự xóa.
- Xác minh superaoe.com trên Google Search Console và Bing Webmaster Tools, gửi https://superaoe.com/sitemap.xml.
- Cloudflare dashboard: kiểm tra không bật chặn AI crawler (Block AI bots / AI Crawl Control) nếu muốn được ChatGPT/Claude/Perplexity trích dẫn.
- Đăng tay bài nháp Facebook group (nếu muốn).

## 2026-10-22 (vòng SEO 2 — chủ dự án yêu cầu sửa hết vấn đề)
- Trang chủ sửa cho đúng sự thật (theo yêu cầu trực tiếp của chủ dự án): bỏ mọi câu hứa replay (mục #replay + demo danh sách replay + 2 câu FAQ), thay bằng mục #khan-gia (khán giả xem trực tiếp) và thẻ "Rớt mạng không mất chỗ"; bản Mac ghi "đang thử nghiệm / sắp phát hành" ở meta, hero, thẻ, khu tải, mục MacBook, FAQ. Badge Mac mặc định "SẮP CÓ" trong HTML tĩnh (JS chỉ đổi thành "MỚI" khi `MAC_URL` có giá trị). Thêm FAQPage JSON-LD khớp FAQ hiển thị (7 câu).
- Trang mới: /choi-aoe-co-khan-gia/, /choi-aoe-tren-macbook/ (BreadcrumbList + FAQPage, trang khán giả có HowTo). Liên kết chéo giữa 4 trang.
- sitemap.xml (4 URL, lastmod 2026-10-22), llms.txt cập nhật.
- Ảnh hero img/spectator.jpg nén lại 441 KB → 280 KB (mozjpeg q78), thêm fetchpriority="high".
- Kiểm tra: html-validate sạch cả 4 trang, JSON-LD hợp lệ, không link nội bộ hỏng; GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot/Googlebot/bingbot đều nhận 200.
- Lần sau: đo hạng lại 2026-10-28; trang so sánh GameTV Plus / GPlay / EGOPLAY / GameRanger; theo dõi `MAC_URL` để cập nhật trang Mac khi phát hành.

### Cần chủ dự án quyết định / làm
- Xác minh superaoe.com trên Google Search Console + Bing Webmaster Tools, gửi sitemap (agent không tạo tài khoản được).
- Đăng tay bài nháp `seo/outreach/2026-10-21-facebook-group.md` nếu muốn.
- Khi replay có thật trong launcher hoặc bản Mac phát hành: cập nhật `seo/facts.md`, agent sẽ viết lại nội dung.

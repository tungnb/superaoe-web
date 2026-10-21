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

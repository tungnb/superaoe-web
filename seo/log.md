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

## 2026-10-22 (vòng SEO 3)
- Sửa sai sự thật phát hiện từ launcher 0.2.5 (`C:\SuperAoE\HUONG DAN.txt`, `xtv-cf/wrangler.toml` DELAY_SECONDS="0"): khán giả KHÔNG còn bị phát trễ → bỏ mọi câu "phát trễ để không lộ thông tin" (trang chủ, /choi-aoe-co-khan-gia/, /choi-aoe-online-mien-phi/, llms.txt); đăng ký CÓ ô email (không xác thực) → sửa câu "không cần email".
- Bản Mac thử nghiệm đã có link (commit 838a716 của chủ dự án): cập nhật facts.md, câu FAQ còn ghi "Chưa" ở /choi-aoe-online-mien-phi/ (lệch với JSON-LD) và trang mới.
- Trang mới: /tai-aoe-rise-of-rome/ (từ khóa "tải aoe 1 rise of rome", "download aoe", "đế chế win 11"): gói tải có gì (launcher, game kèm cnc-ddraw, HUONG DAN.txt), 5 bước cài, bảng lỗi thường gặp (SmartScreen do exe chưa ký số, chạy trong zip, tắt nhầm game, rớt mạng), 6 FAQ; Breadcrumb + FAQPage + HowTo.
- /choi-aoe-co-khan-gia/: thêm bảng phím tắt khán giả (1–8, F, 0, 9, F4, F11).
- Kỹ thuật: 404.html (noindex) + `not_found_handling: "404-page"` trong wrangler.jsonc; mọi trang thêm og:image:width/height/alt và robots max-image-preview:large; SoftwareApplication thêm softwareVersion 0.2.5; footer mọi trang link tới trang tải; sitemap 5 URL.
- Kiểm tra: html-validate sạch 6 file, JSON-LD hợp lệ, không link/anchor hỏng.
- Ghi chú: lần này có một phiên khác sửa cùng lúc trang Mac và trang chủ (hướng dẫn cài macOS 15 "Apple không thể xác minh"); các sửa đó nằm trong cùng commit/deploy này. FAQ JSON-LD trang Mac và trang chủ dùng URL thay cho chữ "tại đây" của bản hiển thị — khác chữ nhưng cùng ý, chấp nhận.
- Hoãn: trang so sánh GameTV Plus/GPlay/EGOPLAY — nguồn công khai chủ yếu là bài quảng bá, chưa đủ dữ kiện kiểm chứng để so sánh trung thực.
- Lần sau: đo hạng 2026-10-28; cân nhắc trang "hướng dẫn chủ phòng / tạo phòng"; theo dõi phản hồi bản Mac để cập nhật.

## 2026-10-22 (vòng SEO 4 — phiên riêng, chạy song song vòng 3)
- Sửa hướng dẫn cài bản Mac theo yêu cầu phiên chính: macOS 15 Sequoia không còn bỏ qua cảnh báo "Apple không thể xác minh…" bằng chuột phải → Open. Trang /choi-aoe-tren-macbook/ thêm mục #cai-dat (Terminal `bash ` + kéo file; hoặc Privacy & Security → Open Anyway; macOS 14 trở xuống vẫn chuột phải → Open) + 1 FAQ/JSON-LD; trang chủ sửa 2 chỗ. (Đã deploy chung trong b7ce44e.)
- Trang mới: /choi-de-che-qua-mang/ (từ khóa "chơi đế chế qua mạng", "chơi đế chế bằng radmin / hamachi", "chơi aoe lan qua internet"): vì sao AoE1 khó chơi qua Internet (DirectPlay), cách LAN ảo truyền thống + lỗi hay gặp (ghi rõ SuperAoE không hỗ trợ các phần mềm đó), 4 bước với SuperAoE, bảng LAN thật / LAN ảo / mở cổng / SuperAoE, 7 FAQ. Breadcrumb + FAQPage.
- Bỏ trang trùng: đã viết /tai-de-che-aoe-1/ nhưng vòng 3 vừa đăng /tai-aoe-rise-of-rome/ cùng ý định tìm kiếm → xóa trang của mình (không deploy), trỏ link về /tai-aoe-rise-of-rome/.
- Kỹ thuật: hreflang vi + x-default trên mọi trang; footer mọi trang + 1 link trong bài (/choi-aoe-online-mien-phi/ mục "Vì sao không cần VPN") tới trang mới; meta description trang Mac rút còn 153 ký tự (nhắc macOS 15); sitemap 6 URL; llms.txt thêm trang + câu trả lời nhanh.
- Kiểm tra: html-validate sạch (bỏ qua inline-style/doctype-style), JSON-LD parse được, FAQ JSON-LD khớp FAQ hiển thị, không link/anchor nội bộ hỏng; live == local cho 6 trang + llms + sitemap; URL lạ trả 404 trang tùy biến; IndexNow 200.
- Lần sau: nén thêm ảnh (tạo bản WebP/nhỏ hơn cho img/spectator.jpg 280 KB với srcset — máy chưa có sharp/cwebp); trang "hướng dẫn chủ phòng / tạo phòng" (vòng 3 đã đề xuất); đo hạng 2026-10-28, thêm cột cho "chơi đế chế qua mạng".

### Cần chủ dự án quyết định / làm
- Google Search Console + Bing Webmaster Tools: xác minh superaoe.com, gửi sitemap, yêu cầu lập chỉ mục 6 URL (agent không đăng nhập được).
- Ký số SuperAoE.exe (Windows) và notarize bản Mac nếu có điều kiện: bớt cảnh báo SmartScreen/Gatekeeper, đỡ mất người tải.
- Backlink: đăng bài giới thiệu ở group Facebook Đế Chế, Voz, kênh YouTube Đế Chế (nháp trong `seo/outreach/`).
- Khán giả hiện không bị phát trễ (DELAY_SECONDS="0"): nếu muốn chống "báo bài" trong trận nghiêm túc thì cân nhắc bật lại độ trễ; website đang ghi đúng là gần như không trễ.

## 2026-10-22 (replay + Mac chính thức)
- Chủ dự án xác nhận: đã có bản cài Mac chạy mượt trên MacBook M, và tính năng lưu + xem lại replay. Bỏ hết chữ "thử nghiệm" về Mac (trang chủ, /choi-aoe-tren-macbook/, /choi-aoe-online-mien-phi/, /tai-aoe-rise-of-rome/, /choi-de-che-qua-mang/, llms.txt); thêm mục Replay + nút tải Mac đầy đủ ở hero trang chủ; title/meta/OG/Twitter/JSON-LD (operatingSystem "Windows, macOS", featureList có replay).
- Trang mới: https://superaoe.com/xem-lai-tran-aoe-replay/ (từ khóa replay aoe, xem lại trận đế chế, lưu replay đế chế; HowTo + FAQPage + BreadcrumbList). Liên kết từ trang chủ, mọi trang đích, footer, 404.
- Cập nhật sitemap (7 URL), llms.txt, seo/facts.md, seo/keywords.md, Quy tắc sự thật trong seo-agent.md. IndexNow gửi các URL đã đổi.
- Cần chủ dự án quyết định: chưa kiểm chứng riêng việc xem replay trên bản Mac (gói Mac có thể chưa có thanh điều khiển mới) — website không khẳng định điều này.

## 2026-10-22 (vòng SEO 5 — cập nhật rớt mạng / vào lại trận theo launcher 0.2.8)
- Theo yêu cầu phiên website (đã kiểm chứng: `xtv-cf/src/room.js` RECONNECT_WAIT_SECONDS mặc định 1800, launcher 0.2.8 nút "↻ Vào lại trận"/"↻ Mở lại game"): bỏ mọi câu "giữ chỗ 60 giây" / "tắt hẳn game thì không vào lại được" ở /choi-aoe-online-mien-phi/ (FAQ + JSON-LD + tick), /choi-de-che-qua-mang/ (FAQ + JSON-LD + tick, thêm ảnh thật /img/cho-ket-noi.jpg), /tai-aoe-rise-of-rome/ (2 dòng bảng lỗi), llms.txt; trang chủ softwareVersion 0.2.6 → 0.2.8.
- seo-agent.md "Quy tắc sự thật" + seo/facts.md: thay luật rớt mạng cũ bằng luật 30 phút / Vào lại trận; luật cài Mac thêm cách mở trên macOS 15 (chuột phải → Open không còn được).
- Kiểm tra: html-validate sạch, JSON-LD hợp lệ, không link/anchor hỏng; deploy d34cb5be, live == local; IndexNow.

## 2026-10-22 (vòng SEO 6 — tự động, cập nhật theo launcher 0.3.0 P2P)
- Sản phẩm đổi (launcher/package.json 0.3.0, NOTES.md §9k): trận chạy P2P qua WebRTC (máy người ngồi ghế đầu giữ trận), dự phòng qua máy chủ Cloudflare. Các câu "dữ liệu game đi qua máy chủ relay trên Cloudflare" không còn đúng → sửa ở trang chủ (FAQ + JSON-LD + thẻ tính năng), /choi-aoe-online-mien-phi/ (FAQ + JSON-LD + đoạn "Vì sao không cần VPN"), /choi-de-che-qua-mang/ (lead, mục cách hoạt động + đoạn "Lưu ý trung thực": máy ghế đầu tắt launcher/mất mạng hẳn thì ván dừng, IP lộ như mọi game P2P; FAQ + JSON-LD; og:description), llms.txt (mục Mạng + câu trả lời nhanh; thêm cách mở bản Mac trên macOS 15).
- softwareVersion 0.2.8 → 0.3.0 (trang chủ), nhãn "Launcher 0.3.0" ở /tai-aoe-rise-of-rome/.
- seo/facts.md + Quy tắc sự thật trong seo-agent.md: thêm luật P2P và giới hạn; không hứa "luôn nối thẳng".
- Không đo hạng (lần trước 2026-10-21, lần tới 2026-10-28); không soạn outreach (tuần này đã có 2026-10-21).
- Kiểm tra: html-validate sạch, JSON-LD parse được, FAQ JSON-LD khớp hiển thị (thay cùng chuỗi ở cả hai).
- Lần sau: đo hạng 2026-10-28; trang "hướng dẫn chủ phòng / tạo phòng" (nhắc chủ phòng/ghế đầu nên dùng mạng ổn định vì trận P2P); nén ảnh spectator.jpg.

### Cần chủ dự án quyết định / làm
- Xác nhận cách nói về P2P: website giờ nói rõ "máy ghế đầu tắt/mất mạng hẳn thì ván dừng cho cả phòng". Nếu sau này có chuyển chủ trận hoặc TURN thì báo để sửa.
- Câu "rớt mạng cả đội chờ 30 phút" vẫn giữ cho người chơi khác ghế đầu; nếu thực tế P2P khác (ví dụ ghế đầu chập chờn ngắn vẫn chờ được) hãy kiểm chứng rồi cập nhật seo/facts.md.
- Vẫn tồn đọng: Google Search Console + Bing Webmaster Tools, ký số exe / notarize Mac, đăng bài outreach.

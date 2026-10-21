# Sự thật sản phẩm SuperAoE (nguồn cho mọi nội dung SEO)

Cập nhật: 2026-10-22 (launcher 0.2.6, `MAC_URL` trong index.html = https://superaoe.com/download/mac; nguồn: `C:\SuperAoE\HUONG DAN.txt`, xtv-cf/wrangler.toml DELAY_SECONDS="0").

Đã có thật:
- Miễn phí; tải `SuperAoE.zip` cho Windows 10/11 tại https://superaoe.com/download (~158 MB, có sẵn game Age of Empires 1 Rise of Rome).
- Tài khoản: tên đăng nhập + mật khẩu + email (KHÔNG xác thực email); mật khẩu băm PBKDF2, danh sách phòng, mã phòng 6 ký tự, mật khẩu phòng tùy chọn.
- Phòng chờ chữ U: 8 ghế người chơi (Nhất..Bát phẩm = màu 1–8) + 3 ghế khán giả (vua giữa, 2 thái giám). Tối đa 15 thành viên/phòng.
- Chủ phòng bấm Bắt đầu → mọi người tự vào game đúng vai, không gõ IP. Hết ván vẫn ở lại phòng, đánh tiếp ván sau.
- Khán giả xem trực tiếp bằng đồ họa gốc, KHÔNG còn độ trễ (trước là 2 phút); vào lại trận đang diễn ra được (nút "Mở lại game"). Phím: 1–8 theo người chơi, F camera tự do, 0 hiện cả bản đồ, 9 sương mù, F4 bảng điểm, F11 đồng hồ + dân số.
- Người chơi tắt game: vào lại được nếu trận chưa vào màn chơi; đã vào màn chơi thì chờ ván sau.
- Chủ phòng kéo-thả người giữa các ghế; "Kết thúc ván"; trong ván người mới chỉ ngồi ghế khán giả trống.
- Gói tải là thư mục `C:\SuperAoE`: `SuperAoE.exe`, `game\`, `HUONG DAN.txt`. Gửi cho bạn bè: nén cả thư mục.
- Không cần VPN, không cần mở cổng: kết nối đi qua máy chủ relay trên Cloudflare.
- Rớt mạng được giữ chỗ 60 giây (game còn mở thì tự nối lại; nếu game bị tắt giữa ván thì người chơi không vào lại được, khán giả thì được).
- Launcher tự cập nhật.

- **Bản Mac (chính thức từ 22/10/2026, chủ dự án xác nhận chạy mượt trên MacBook M):** https://superaoe.com/download/mac (SuperAoE_Mac_M.zip ~80 MB), cho MacBook chip Apple M1, M2, M3, M4…; chạy game qua Wine đóng gói sẵn; cài: giải nén, chuột phải "CAI DAT SuperAoE.command" → Open (lần đầu cần Internet, 10–15 phút) → SuperAoE.app trong /Applications; app tự cập nhật trong app; chơi chung phòng với Windows. File cài chưa ký với Apple → macOS 15 có thể cần Terminal hoặc Open Anyway (hướng dẫn ở /choi-aoe-tren-macbook/#cai-dat). KHÔNG còn gọi là "thử nghiệm"/"beta". Mac chip Intel: KHÔNG hỗ trợ.
- **Replay / xem lại trận (đã có, launcher 0.2.5+, thanh điều khiển 0.2.6):** mọi trận online tự lưu .aoerep trên máy chủ. Launcher: menu "Lịch sử trận / Xem lại" liệt kê trận của bạn, bấm để xem; "Mở file replay" mở file .aoerep. Xem bằng chính game gốc (mô phỏng đúng từng lệnh, không phải video), thấy toàn bản đồ như khán giả. Thanh điều khiển: về đầu, lùi 30/10 giây, dừng/chạy, tới 10/30 giây, tốc độ x0.5–x8, bấm thanh tiến trình để nhảy tới thời điểm bất kỳ; phím Space/K, J/L, -/+, Home, H. Miễn phí. Cách nói chủ dự án muốn: "lưu và xem lại trận đấu cũ để rút kinh nghiệm và học hỏi từ đối thủ". Trang đích: /xem-lai-tran-aoe-replay/.

Chưa kiểm chứng (không viết là có):
- Xem replay trên bản Mac: chưa được kiểm chứng riêng (gói Mac có thể chưa có thanh điều khiển mới). Không viết riêng "xem replay trên Mac".
- Không có số liệu người chơi/trận công khai: không bịa.

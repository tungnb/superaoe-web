# Sự thật sản phẩm SuperAoE (nguồn cho mọi nội dung SEO)

Cập nhật: 2026-10-22 (launcher 0.2.5, `MAC_URL` trong index.html = rỗng; nguồn: `C:\SuperAoE\HUONG DAN.txt`, xtv-cf/wrangler.toml DELAY_SECONDS="0").

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

CHƯA phát hành / chưa kiểm chứng (hoặc chỉ là thử nghiệm):
- Bản MacBook: CÓ bản thử nghiệm từ 22/10/2026 tại https://superaoe.com/download/mac (SuperAoE_Mac_M.zip ~80 MB, chip Apple M1+, Wine). Cài: chạy "CAI DAT SuperAoE.command" (lần đầu cần Internet, 10–15 phút). Chưa ký với Apple → macOS 15 cần chạy bằng Terminal hoặc Open Anyway. Luôn gọi là "bản thử nghiệm", có thể còn lỗi (nhất là âm thanh). Mac Intel: không hỗ trợ.
- Tự lưu replay trong launcher: CHƯA có.

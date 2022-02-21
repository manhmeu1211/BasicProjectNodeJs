1. Tạo sever nodejs với express sử dụng database mySQL.
- Khởi tạo thư mục Project nodejs và cài đặt các dependency:
 + Express, TypeScrpit
 + Dotenv: Module Zero-dependency, dùng đẻ đẩy các biến môi trường từ file .env vào process.env.
 + CORS: Một middleware Express cho phép ta có thể grant access cho các request từ các site khác nhau truy cập cập các tài nguyên khác nhau của server
 + Helmet: Một middleware Express, bảo mật các ứng dụng bằng cách setting các HTTP headers khác nhau, giúp giảm thiểu các attack vectors phổ biến.
 + Tạo file tsconfig.json để config typescript
 + Tạo file .env để lưu các biến môi trường

2. Cấu trúc project:
 + app.ts => config app
 + tsconfig => config typescript
 + webpack.config.ts: config HRM webpack
 + Helpers : Lưu trữ những file config, hoặc những file có thể dùng chung cho hệ thống
 + Controller: Lưu trữ file xử lí logic ( query database, handle logic ...)
 + Routes: Chứa các router xử lí request người dùng
 + Model: Chứa các model liên kết với database. Xử lý các query...
 + Middleware: Chứa các file xử lí error, validate ...

3. Project basic (Quản lý nhân viên) => Inprogress:
 + Sẽ có 3 đối tượng : User ( nhân viên trong công ty ), Company ( công ty ) và Project ( Dự án )
 + Mỗi dự án sẽ có nhiều user tham gia và ngược lại mỗi user có thể tham gia nhiều dự án
 + Mỗi công ty có nhiều user
 + User Authen and author
 + User CRUD
 + Company CRUD
 + Project CRUD
 + Chat basic giữa các user sử dụng socket
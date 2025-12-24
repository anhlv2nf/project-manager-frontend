# Frontend Coding Convention - Project Manager

Mọi thành phần mã nguồn Frontend phải tuân thủ nghiêm ngặt các quy tắc thiết kế và lập trình dưới đây:

## 1. Cấu trúc thư mục (Project Structure)
- **src/components**: Chứa các component giao diện chức năng (ví dụ: `UserTable.jsx`, `ProjectCard.jsx`).
- **src/components/common**: Chứa các UI components dùng chung toàn hệ thống (ví dụ: `LoadingButton.jsx`, `BaseModal.jsx`, `CustomInput.jsx`).
- **src/services**: Chứa các file quản lý gọi API (ví dụ: `userService.js`, `projectService.js`). KHÔNG gọi axios trực tiếp trong component nếu logic phức tạp.
- **src/hooks**: Chứa các Custom Hooks dùng chung (ví dụ: `useAuth.js`, `useFetch.js`).
- **src/constants**: Chứa các hằng số, cấu hình, enum (ví dụ: `appConstants.js`).
- **src/assets**: Chứa hình ảnh, icons, font chữ.
- **src/utils**: Chứa các hàm helper xử lý logic thuần javascript (ví dụ: `formatDate.js`, `validateHelper.js`).

## 2. Quy tắc đặt tên (Naming Conventions)
- **Components**: PascalCase (Ví dụ: `UserManagement.jsx`, `Header.jsx`).
- **Functions & Variables**: camelCase (Ví dụ: `fetchUserData`, `isSubmitting`).
- **Files không phải React Component**: camelCase (Ví dụ: `axiosClient.js`).
- **CSS Classes**: kebab-case (Ví dụ: `header-search`, `btn-primary`).
- **Constants**: UPPER_SNAKE_CASE (Ví dụ: `MAX_UPLOAD_SIZE`, `DEFAULT_PAGE_SIZE`).

## 3. Quy trình gọi API & Services
- Sử dụng **Axios** làm thư viện gọi API chính (Cấu hình trong `src/services/apiClient.js`).
- **Service Layer**: Mọi logic gọi API PHẢI nằm trong folder `src/services`. KHÔNG gọi axios thô trong component.
- **Cấu trúc Service**: Khuyến khích sử dụng Object hoặc Class để gom nhóm các API liên quan (ví dụ: `userService`).
- Mọi API call phải được bọc trong `try-catch` để xử lý lỗi.
- Luôn hiển thị trạng thái **Loading** (sử dụng `LoadingButton` hoặc Spinner) khi đang gửi yêu cầu.
- **API Response**: Luôn xử lý dữ liệu dựa trên cấu trúc trả về chuẩn từ Backend (`{data, message, status}`).

## 4. Quy tắc viết Component (React Best Practices)
- Ưu tiên sử dụng **Functional Components** và **Hooks**.
- **Common Components**: Các thành phần giao diện lặp lại (Button, Input, Badge, Modal) PHẢI được tách ra `src/components/common` để tái sử dụng. Tên file bắt đầu bằng tiền tố `Base` hoặc `Common` (ví dụ: `BaseModal.jsx`).
- **Destructuring Props**: Luôn giải nén props ngay tại tham số của function.
- **Component nhỏ gọn**: Nếu một component vượt quá 300 dòng code, hãy cân nhắc tách nhỏ thành các sub-components.
- **Logic tách biệt**: Các logic xử lý dữ liệu nặng nên đưa vào Custom Hooks hoặc Service.

## 5. Quản lý Hằng số & Helpers
- **Constants**: Tất cả magic strings, URLs, Roles, Status PHẢI được định nghĩa trong `src/constants`. KHÔNG viết cứng (hardcode) trong code logic.
- **Helpers**: Các hàm xử lý logic dùng chung (format ngày tháng, validate, xử lý chuỗi) PHẢI đặt trong `src/utils`.

## 6. Xử lý Form & Validation
- **Bắt buộc validate Frontend**: Mọi form phải thực hiện validate dữ liệu phía Frontend bằng các hàm từ `src/utils/validateHelper.js`.
- Hiển thị thông báo lỗi rõ ràng, đổi màu viền ô nhập liệu khi dữ liệu không hợp lệ.
- Sử dụng `LoadingButton` cho mọi hành động Submit form để ngăn chặn việc gửi yêu cầu trùng lặp.


---
*Lưu ý: Mọi thay đổi về giao diện hoặc logic Frontend đều phải dựa trên bộ quy tắc này.*

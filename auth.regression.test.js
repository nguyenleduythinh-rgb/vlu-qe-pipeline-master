// auth.regression.test.js
const { login } = require('./auth');

describe('Regression Tests - Authentication Edge Cases & Exceptions', () => {

  describe('Kiểm tra ngoại lệ dữ liệu đầu vào (Validation)', () => {
    test('Ném lỗi khi username rỗng', () => {
      expect(() => login('', '123')).toThrow('Username cannot be empty');
    });

    test('Ném lỗi khi username chỉ chứa khoảng trắng', () => {
      expect(() => login('   ', '123')).toThrow('Username cannot be empty');
    });

    test('Ném lỗi khi password rỗng', () => {
      expect(() => login('admin', '')).toThrow('Password cannot be empty');
    });

    test('Ném lỗi khi truyền tham số không hợp lệ (null / undefined)', () => {
      expect(() => login(null, '123')).toThrow('Username cannot be empty');
      expect(() => login('admin', undefined)).toThrow('Password cannot be empty');
    });
  });

  describe('Kiểm tra thông tin tài khoản và mật khẩu', () => {
    test('Ném lỗi khi username không tồn tại', () => {
      expect(() => login('non_existing_user', '123')).toThrow('User not found');
    });

    test('Ném lỗi khi mật khẩu sai', () => {
      expect(() => login('admin', 'wrong_password')).toThrow('Invalid password');
    });

    test('Đăng nhập thành công với mật khẩu chứa ký tự đặc biệt', () => {
      const result = login('john_doe', 'P@ssword!2026');
      expect(result).toBe(true);
    });

    test('Ném lỗi khi mật khẩu chứa ký tự đặc biệt nhưng nhập sai', () => {
      expect(() => login('john_doe', 'P@ssword!2025')).toThrow('Invalid password');
    });
  });

  describe('Kiểm tra trạng thái bảo mật tài khoản', () => {
    test('Ném lỗi khi tài khoản đang bị khóa (Account is locked)', () => {
      expect(() => login('locked_user', '123')).toThrow('Account is locked');
    });
  });

});

// auth.js
// ==========================================
// Last updated: CI/CD Pipeline Verification
// Version: 1.0.1
// ==========================================
// Giả lập cơ sở dữ liệu tài khoản
const USERS_DB = {
  admin: { password: '123', isLocked: false },
  john_doe: { password: 'P@ssword!2026', isLocked: false },
  locked_user: { password: '123', isLocked: true }
};

/**
 * Hàm xác thực đăng nhập
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} true nếu thành công
 * @throws {Error} nếu thông tin không hợp lệ hoặc tài khoản bị khóa
 */
function login(username, password) {
  // 1. Kiểm tra username và password không được rỗng / sai kiểu
  if (typeof username !== 'string' || username.trim() === '') {
    throw new Error('Username cannot be empty');
  }

  if (typeof password !== 'string' || password === '') {
    throw new Error('Password cannot be empty');
  }

  // 2. Kiểm tra tài khoản có tồn tại không
  const user = USERS_DB[username];
  if (!user) {
    throw new Error('User not found');
  }

  // 3. Kiểm tra trạng thái tài khoản bị khóa
  if (user.isLocked) {
    throw new Error('Account is locked');
  }

  // 4. Kiểm tra mật khẩu
  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return true;
}

module.exports = { login };

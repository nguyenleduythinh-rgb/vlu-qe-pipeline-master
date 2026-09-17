// auth.smoke.test.js
const { login } = require('./auth');

describe('Smoke Test - Authentication', () => {
  test('Kiểm tra đăng nhập thành công với admin/123 trả về true', () => {
    const result = login('admin', '123');
    expect(result).toBe(true);
  });
});

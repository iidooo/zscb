package com.edo.zscb.model.vo;

import java.math.BigDecimal;

public class BigDAccount {
    
    // UID
    private Integer id;
    
    // 用户名称
    private String username;
    
    // 用户类型
    private String user_type;
    
    // 邮箱地址
    private String email;
    
    // 联系电话
    private String phone;
    
    // 管理员权限
    private boolean is_super_admin;
    
    // 权限角色
    private String roles;
        
    // 锁定状态
    private String status;
        
    // 当前账户余额
    private BigDecimal balance;
    
    // 已经消费的金额
    private BigDecimal blocked_fund;
    
    // 创建账户的时间
    private String create_time;
    
    private BigDAccountDetail detail;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isIs_super_admin() {
        return is_super_admin;
    }

    public void setIs_super_admin(boolean is_super_admin) {
        this.is_super_admin = is_super_admin;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getBlocked_fund() {
        return blocked_fund;
    }

    public void setBlocked_fund(BigDecimal blocked_fund) {
        this.blocked_fund = blocked_fund;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public BigDAccountDetail getDetail() {
        return detail;
    }

    public void setDetail(BigDAccountDetail detail) {
        this.detail = detail;
    }
    
    
}

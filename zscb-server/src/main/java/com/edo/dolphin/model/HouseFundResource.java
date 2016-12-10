package com.edo.dolphin.model;

public class HouseFundResource extends Resource {
    
    // 当前账户状态:A3
    private String accountStatus;
    
    // 账户所在单位名称:A4
    private String accountCompanyName;
    
    // 开户日期:A5
    private String accountCreateTime;

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getAccountCompanyName() {
        return accountCompanyName;
    }

    public void setAccountCompanyName(String accountCompanyName) {
        this.accountCompanyName = accountCompanyName;
    }

    public String getAccountCreateTime() {
        return accountCreateTime;
    }

    public void setAccountCreateTime(String accountCreateTime) {
        this.accountCreateTime = accountCreateTime;
    }
    
    
}

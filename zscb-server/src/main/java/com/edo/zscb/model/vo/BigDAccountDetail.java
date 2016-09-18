package com.edo.zscb.model.vo;

import java.math.BigDecimal;

import net.sf.json.JSONObject;

public class BigDAccountDetail {
    
    // 折扣率
    private BigDecimal discount;
    
    // 公司名称
    private String enterprise;
    
    // QQ 联系方式
    private String qq;
    
    // 真实姓名
    private String real_name;
    
    // 备注
    private String remark;
    
    // 性别
    private String sex;
    
    // 电话号码
    private String telephone;
    
    public BigDAccountDetail(){
    }
    
    public BigDAccountDetail(JSONObject json){
        this.qq = json.getString("qq");
        this.remark = json.getString("remark");
        this.telephone = json.getString("telephone");
        this.sex = json.getString("sex");
        this.discount = BigDecimal.valueOf(json.getDouble("discount"));
        this.enterprise = json.getString("enterprise");
        this.real_name = json.getString("real_name");
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public String getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(String enterprise) {
        this.enterprise = enterprise;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getReal_name() {
        return real_name;
    }

    public void setReal_name(String real_name) {
        this.real_name = real_name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemarks(String remark) {
        this.remark = remark;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    
    
}

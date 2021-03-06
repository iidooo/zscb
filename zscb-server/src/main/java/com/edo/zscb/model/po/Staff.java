package com.edo.zscb.model.po;

import java.util.Date;

public class Staff {
    private Integer staffID;

    private String idNumber;

    private String socialCompany;

    private String socialStatus;

    private String socialLastDate;

    private String graduateSchool;

    private String highestDegree;

    private String taxCompany;

    private String taxStatus;

    private String taxLastDate;

    private String dataSource;
    
    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private Boolean isDelete;

    private Integer version;

    public Integer getStaffID() {
        return staffID;
    }

    public void setStaffID(Integer staffID) {
        this.staffID = staffID;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getSocialCompany() {
        return socialCompany;
    }

    public void setSocialCompany(String socialCompany) {
        this.socialCompany = socialCompany == null ? null : socialCompany.trim();
    }

    public String getSocialStatus() {
        return socialStatus;
    }

    public void setSocialStatus(String socialStatus) {
        this.socialStatus = socialStatus == null ? null : socialStatus.trim();
    }

    public String getSocialLastDate() {
        return socialLastDate;
    }

    public void setSocialLastDate(String socialLastDate) {
        this.socialLastDate = socialLastDate == null ? null : socialLastDate.trim();
    }

    public String getGraduateSchool() {
        return graduateSchool;
    }

    public void setGraduateSchool(String graduateSchool) {
        this.graduateSchool = graduateSchool == null ? null : graduateSchool.trim();
    }

    public String getHighestDegree() {
        return highestDegree;
    }

    public void setHighestDegree(String highestDegree) {
        this.highestDegree = highestDegree == null ? null : highestDegree.trim();
    }

    public String getTaxCompany() {
        return taxCompany;
    }

    public void setTaxCompany(String taxCompany) {
        this.taxCompany = taxCompany == null ? null : taxCompany.trim();
    }

    public String getTaxStatus() {
        return taxStatus;
    }

    public void setTaxStatus(String taxStatus) {
        this.taxStatus = taxStatus == null ? null : taxStatus.trim();
    }

    public String getTaxLastDate() {
        return taxLastDate;
    }

    public void setTaxLastDate(String taxLastDate) {
        this.taxLastDate = taxLastDate == null ? null : taxLastDate.trim();
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getUpdateUserID() {
        return updateUserID;
    }

    public void setUpdateUserID(Integer updateUserID) {
        this.updateUserID = updateUserID;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getCreateUserID() {
        return createUserID;
    }

    public void setCreateUserID(Integer createUserID) {
        this.createUserID = createUserID;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
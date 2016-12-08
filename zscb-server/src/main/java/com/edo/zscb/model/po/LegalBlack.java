package com.edo.zscb.model.po;

import java.util.Date;

public class LegalBlack {
    private Integer blackID;

    private String idNumber;

    private String recordTime;
    
    private String detail;

    private String dataSource;
    
    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private Boolean isDelete;

    private Integer version;

    public Integer getBlackID() {
        return blackID;
    }

    public void setBlackID(Integer blackID) {
        this.blackID = blackID;
    }



    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(String recordTime) {
        this.recordTime = recordTime;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail == null ? null : detail.trim();
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
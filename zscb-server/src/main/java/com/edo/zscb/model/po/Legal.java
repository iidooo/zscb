package com.edo.zscb.model.po;

import java.util.Date;

public class Legal {
    private Integer legalID;

    private Integer identityID;

    private String judgeDoc;

    private String executiveInfo;

    private String creditInfo;

    private String courtAnnounce;

    private String serviceAnnounce;

    private String judgeProcess;

    private String liquidationInfo;

    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private Boolean isDelete;

    private Integer version;

    public Integer getLegalID() {
        return legalID;
    }

    public void setLegalID(Integer legalID) {
        this.legalID = legalID;
    }

    public Integer getIdentityID() {
        return identityID;
    }

    public void setIdentityID(Integer identityID) {
        this.identityID = identityID;
    }

    public String getJudgeDoc() {
        return judgeDoc;
    }

    public void setJudgeDoc(String judgeDoc) {
        this.judgeDoc = judgeDoc == null ? null : judgeDoc.trim();
    }

    public String getExecutiveInfo() {
        return executiveInfo;
    }

    public void setExecutiveInfo(String executiveInfo) {
        this.executiveInfo = executiveInfo == null ? null : executiveInfo.trim();
    }

    public String getCreditInfo() {
        return creditInfo;
    }

    public void setCreditInfo(String creditInfo) {
        this.creditInfo = creditInfo == null ? null : creditInfo.trim();
    }

    public String getCourtAnnounce() {
        return courtAnnounce;
    }

    public void setCourtAnnounce(String courtAnnounce) {
        this.courtAnnounce = courtAnnounce == null ? null : courtAnnounce.trim();
    }

    public String getServiceAnnounce() {
        return serviceAnnounce;
    }

    public void setServiceAnnounce(String serviceAnnounce) {
        this.serviceAnnounce = serviceAnnounce == null ? null : serviceAnnounce.trim();
    }

    public String getJudgeProcess() {
        return judgeProcess;
    }

    public void setJudgeProcess(String judgeProcess) {
        this.judgeProcess = judgeProcess == null ? null : judgeProcess.trim();
    }

    public String getLiquidationInfo() {
        return liquidationInfo;
    }

    public void setLiquidationInfo(String liquidationInfo) {
        this.liquidationInfo = liquidationInfo == null ? null : liquidationInfo.trim();
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
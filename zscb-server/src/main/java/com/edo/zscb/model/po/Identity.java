package com.edo.zscb.model.po;

import java.util.Date;

import com.iidooo.core.model.po.SecurityUser;

public class Identity {
    private Integer identityID;

    private String name = "";

    private String IDNumber = "";

    private String mobile;

    private String bankNumber;

    private String houseNumber;

    private String houseAddress;

    private String houseArea;

    private String houseOwnerUserName;

    private String HouseOwnerIDNumber;

    private Boolean isMatch;

    private Boolean isMain;

    private Integer mateID;

    private Identity mate;

    private String dataSource;

    private String remarks;

    private Date updateTime;

    private Integer updateUserID;

    private Date createTime;

    private Integer createUserID;

    private SecurityUser createUser;

    private Boolean isDelete;

    private Integer version;

    public Integer getIdentityID() {
        return identityID;
    }

    public void setIdentityID(Integer identityID) {
        this.identityID = identityID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getIDNumber() {
        return IDNumber;
    }

    public void setIDNumber(String IDNumber) {
        this.IDNumber = IDNumber == null ? null : IDNumber.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(String bankNumber) {
        this.bankNumber = bankNumber == null ? null : bankNumber.trim();
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber == null ? null : houseNumber.trim();
    }

    public String getHouseAddress() {
        return houseAddress;
    }

    public void setHouseAddress(String houseAddress) {
        this.houseAddress = houseAddress;
    }

    public String getHouseArea() {
        return houseArea;
    }

    public void setHouseArea(String houseArea) {
        this.houseArea = houseArea;
    }

    public String getHouseOwnerUserName() {
        return houseOwnerUserName;
    }

    public void setHouseOwnerUserName(String houseOwnerUserName) {
        this.houseOwnerUserName = houseOwnerUserName;
    }

    public String getHouseOwnerIDNumber() {
        return HouseOwnerIDNumber;
    }

    public void setHouseOwnerIDNumber(String houseOwnerIDNumber) {
        HouseOwnerIDNumber = houseOwnerIDNumber;
    }

    public Boolean getIsMatch() {
        return isMatch;
    }

    public void setIsMatch(Boolean isMatch) {
        this.isMatch = isMatch;
    }

    public Boolean getIsMain() {
        return isMain;
    }

    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }

    public Integer getMateID() {
        return mateID;
    }

    public void setMateID(Integer mateID) {
        this.mateID = mateID;
    }

    public Identity getMate() {
        return mate;
    }

    public void setMate(Identity mate) {
        this.mate = mate;
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

    public SecurityUser getCreateUser() {
        return createUser;
    }

    public void setCreateUser(SecurityUser createUser) {
        this.createUser = createUser;
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
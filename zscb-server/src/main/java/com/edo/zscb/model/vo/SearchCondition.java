package com.edo.zscb.model.vo;

import java.util.ArrayList;
import java.util.List;

import com.iidooo.core.model.Page;

public class SearchCondition {
    
    private String telephone;

    private String name;

    private String idNumber;

    private String mobile;

    private String cardNumber;

    private String houseNumber;

    private String houseAddress;

    private String houseArea;

    private List<HouseOwner> houseOwnerList;

    private String field;

    private Page page;

    public SearchCondition() {
        this.houseOwnerList = new ArrayList<HouseOwner>();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
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

    public List<HouseOwner> getHouseOwnerList() {
        return houseOwnerList;
    }

    public void setHouseOwnerList(List<HouseOwner> houseOwnerList) {
        this.houseOwnerList = houseOwnerList;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

}

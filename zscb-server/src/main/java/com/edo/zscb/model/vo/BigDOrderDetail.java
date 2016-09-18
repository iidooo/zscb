package com.edo.zscb.model.vo;

import net.sf.json.JSONObject;

public class BigDOrderDetail {
    private Integer id;

    private String id_number;

    private String name;
    
    private String telephone;
    
    private BigDOrderDetailResult result;

    public BigDOrderDetail() {

    }

    public BigDOrderDetail(JSONObject json) {
        this.id = json.getInt("id");
        this.id_number = json.getString("id_number");
        this.name = json.getString("name");
        this.telephone = json.getString("telephone");
        
        result = new BigDOrderDetailResult(json.getJSONObject("result"));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public BigDOrderDetailResult getResult() {
        return result;
    }

    public void setResult(BigDOrderDetailResult result) {
        this.result = result;
    }

}

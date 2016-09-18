package com.edo.zscb.model.vo;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BigDOrderList {
    private List<BigDOrder> orders;
    
    private Integer page;
    
    private Integer per_page;
    
    private Integer total;
    
    public BigDOrderList(){
        this.page = 0;
        this.per_page = 0;
        this.total = 0;
        this.orders = new ArrayList<BigDOrder>();
    }
    
    public BigDOrderList(JSONObject json){
        this.page = json.getInt("page");
        this.per_page = json.getInt("per_page");
        this.total = json.getInt("total");
        this.orders = new ArrayList<BigDOrder>();
        JSONArray orderList = json.getJSONArray("orders");
        for (Object item : orderList) {
            BigDOrder order = new BigDOrder((JSONObject)item);
            this.orders.add(order);
        }
    }

    public List<BigDOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<BigDOrder> orders) {
        this.orders = orders;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPer_page() {
        return per_page;
    }

    public void setPer_page(Integer per_page) {
        this.per_page = per_page;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
    
    
}

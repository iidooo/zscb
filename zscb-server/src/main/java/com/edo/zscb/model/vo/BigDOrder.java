package com.edo.zscb.model.vo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BigDOrder {
    private Integer id;

    private String name;

    private BigDecimal actual_cost;

    // 该笔订单用户的返还金额
    private BigDecimal back_amount;

    private String complete_time;

    private Integer count;

    private String create_time;

    private List<BigDOrderDetail> details;

    private BigDOrderDetail detail;

    private BigDecimal discount;

    // 修改后的订单
    private BigDecimal edit_price;

    // 对应extends字段
    private BigDOrderExtend extend;

    private List<String> fields;

    private String pay_time;

    private String remark;

    private String serial_number;

    // 订单状态: PAY_WAIT: 未付费，CONFIRM_WAIT: 待确认，
    // PROCESSING: 处理中，ORDER_COMPLETE: 交易完成，CANCEL_ORDER: 订单未完成
    private String status;

    private BigDecimal total_price;

    private BigDAccount user;

    public BigDOrder() {

    }

    public BigDOrder(JSONObject json) {

        this.details = new ArrayList<BigDOrderDetail>();
        this.fields = new ArrayList<String>();

        this.status = json.getString("status");
        this.count = json.getInt("count");
        this.remark = json.getString("remark");
        this.total_price = BigDecimal.valueOf(json.getDouble("total_price"));
        this.name = json.getString("name");
        this.complete_time = json.getString("complete_time");
        this.edit_price = BigDecimal.valueOf(json.getDouble("edit_price"));

        JSONArray fieldsArray = json.getJSONArray("fields");
        for (Object item : fieldsArray) {
            this.fields.add(item.toString());
        }
        this.back_amount = BigDecimal.valueOf(json.getDouble("back_amount"));
        this.actual_cost = BigDecimal.valueOf(json.getDouble("actual_cost"));
        this.discount = BigDecimal.valueOf(json.getDouble("discount"));
        this.create_time = json.getString("create_time");

        this.extend = new BigDOrderExtend(json.getJSONObject("extends"));

        JSONObject userObject = json.getJSONObject("user");
        user = new BigDAccount(userObject);

        this.pay_time = json.getString("pay_time");
        this.serial_number = json.getString("serial_number");
        this.id = json.getInt("id");

        // 只有在exportjson这个接口调用时才有这个字段值
        if (json.containsKey("details")) {
            JSONArray detailsArray = json.getJSONArray("details");
            for (Object item : detailsArray) {
                BigDOrderDetail detail = new BigDOrderDetail((JSONObject) item);
                this.details.add(detail);
            }
        }

        // 直接返回detail
        if (json.containsKey("detail")) {
            JSONObject detailObject = json.getJSONObject("detail");
            if (detailObject != null && detailObject.containsKey("data")) {
                JSONArray detailsArray = detailObject.getJSONArray("data");
                for (Object item : detailsArray) {
                    this.detail = new BigDOrderDetail((JSONObject) item);
                }
            }
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getActual_cost() {
        return actual_cost;
    }

    public void setActual_cost(BigDecimal actual_cost) {
        this.actual_cost = actual_cost;
    }

    public String getComplete_time() {
        return complete_time;
    }

    public void setComplete_time(String complete_time) {
        this.complete_time = complete_time;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public String getPay_time() {
        return pay_time;
    }

    public void setPay_time(String pay_time) {
        this.pay_time = pay_time;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotal_price() {
        return total_price;
    }

    public void setTotal_price(BigDecimal total_price) {
        this.total_price = total_price;
    }

    public BigDecimal getEdit_price() {
        return edit_price;
    }

    public void setEdit_price(BigDecimal edit_price) {
        this.edit_price = edit_price;
    }

    public BigDecimal getBack_amount() {
        return back_amount;
    }

    public void setBack_amount(BigDecimal back_amount) {
        this.back_amount = back_amount;
    }

    public BigDOrderExtend getExtend() {
        return extend;
    }

    public void setExtend(BigDOrderExtend extend) {
        this.extend = extend;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BigDOrderDetail> getDetails() {
        return details;
    }

    public void setDetails(List<BigDOrderDetail> details) {
        this.details = details;
    }

    public BigDOrderDetail getDetail() {
        return detail;
    }

    public void setDetail(BigDOrderDetail detail) {
        this.detail = detail;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    public BigDAccount getUser() {
        return user;
    }

    public void setUser(BigDAccount user) {
        this.user = user;
    }

}

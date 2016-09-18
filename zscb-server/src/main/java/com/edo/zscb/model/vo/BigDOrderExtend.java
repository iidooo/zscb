package com.edo.zscb.model.vo;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BigDOrderExtend {
    private List<String> async_field;

    private String filename;

    private List<String> sync_field;

    private List<String> fields;
    
    public BigDOrderExtend() {
        
    }
    
    public BigDOrderExtend(JSONObject json) {
        this.async_field = new ArrayList<String>();
        this.sync_field = new ArrayList<String>();
        this.fields = new ArrayList<String>();

        JSONArray fieldsArray = json.getJSONArray("fields");
        for (Object object : fieldsArray) {
            this.fields.add(object.toString());
        }
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    public List<String> getAsync_field() {
        return async_field;
    }

    public void setAsync_field(List<String> async_field) {
        this.async_field = async_field;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public List<String> getSync_field() {
        return sync_field;
    }

    public void setSync_field(List<String> sync_field) {
        this.sync_field = sync_field;
    }

}

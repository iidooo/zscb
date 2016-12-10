package com.edo.dolphin.model;

public class IllegalResource extends Resource {

    // 是否有诈骗案件违法记录:SFYZPLAJWFJL
    private String hasSwindling;

    // 是否有盗窃案件违法记录:SFYDQLAJWFJL
    private String hasTheft;

    // 是否有招摇撞骗案件违法记录:SFYZYZPLAJWFJL
    private String hasTrick;

    // 是否有伪造变造买卖公文证件案件违法记录:SFYWZBZMMGWZJLAJWFJL
    private String hasCounterfeit;

    public String getHasSwindling() {
        return hasSwindling;
    }

    public void setHasSwindling(String hasSwindling) {
        this.hasSwindling = hasSwindling;
    }

    public String getHasTheft() {
        return hasTheft;
    }

    public void setHasTheft(String hasTheft) {
        this.hasTheft = hasTheft;
    }

    public String getHasTrick() {
        return hasTrick;
    }

    public void setHasTrick(String hasTrick) {
        this.hasTrick = hasTrick;
    }

    public String getHasCounterfeit() {
        return hasCounterfeit;
    }

    public void setHasCounterfeit(String hasCounterfeit) {
        this.hasCounterfeit = hasCounterfeit;
    }

}

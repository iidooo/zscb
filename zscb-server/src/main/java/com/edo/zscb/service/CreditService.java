package com.edo.zscb.service;

import java.util.List;

import com.edo.zscb.model.po.AssetHouse;
import com.edo.zscb.model.po.AssetVehicle;
import com.edo.zscb.model.po.Bussiness;
import com.edo.zscb.model.po.Debt;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.Income;
import com.edo.zscb.model.po.Legal;
import com.edo.zscb.model.po.Pawn;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.vo.SearchCondition;

public interface CreditService {
    
    /**
     * 征信查询业务服务
     * @param condition 征信查询的相关条件参数
     * @return 返回查询出的Identity身份信息，作为报告页显示的唯一参数
     */
    Identity creditSearch(SearchCondition condition, Integer operatorID);
    
    int getIdentityListCount(SearchCondition condition);
    
    List<Identity> getIdentityList(SearchCondition condition);
    
    Identity getIdentity(Integer identityID);
    
    Register getRegister(String idNumber);
    
    Staff getStaff(String idNumber);
    
    List<Bussiness> getBussinessList(Integer identityID);
    
    List<AssetHouse> getHouseList(Integer identityID);
    
    List<AssetVehicle> getVehicleList(String idNumber);
    
    Debt getDebt(Integer identityID);
    
    Income getIncome(Integer identityID);
    
    Legal getLegal(Integer identityID);
    
    Pawn getPawn(Integer identityID);
}

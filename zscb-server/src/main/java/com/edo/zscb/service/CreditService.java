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
    
    int getIdentityListCount(SearchCondition condition);
    
    List<Identity> getIdentityList(SearchCondition condition);
    
    Identity getIdentity(Integer identityID);
    
    Register getRegister(Integer identityID);
    
    Staff getStaff(Integer identityID);
    
    List<Bussiness> getBussinessList(Integer identityID);
    
    List<AssetHouse> getHouseList(Integer identityID);
    
    List<AssetVehicle> getVehicleList(Integer identityID);
    
    Debt getDebt(Integer identityID);
    
    Income getIncome(Integer identityID);
    
    Legal getLegal(Integer identityID);
    
    Pawn getPawn(Integer identityID);
}

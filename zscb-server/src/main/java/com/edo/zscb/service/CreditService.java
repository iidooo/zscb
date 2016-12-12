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
import com.edo.zscb.model.po.StaffExp;
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
    
    Identity getIdentity(String idNumber, String dataSource);
    
    Register getRegister(String idNumber, String dataSource);
    
    Staff getStaff(String idNumber, String dataSource);
    
    /**
     * 获得工作经历
     * @param idNumber 身份证号
     * @param dataSource 数据源
     * @return 工作经历列表
     */
    List<StaffExp> getStaffExpList(String idNumber, String dataSource);
    
    List<Bussiness> getBussinessList(String idNumber, String dataSource);
    
    List<AssetHouse> getHouseList(String idNumber, String dataSource);
    
    List<AssetVehicle> getVehicleList(String idNumber, String dataSource);
    
    Debt getDebt(String idNumber, String dataSource);
    
    Income getIncome(String idNumber, String dataSource);
    
    Legal getLegal(String idNumber, String dataSource);
    
    Pawn getPawn(String idNumber, String dataSource);
}

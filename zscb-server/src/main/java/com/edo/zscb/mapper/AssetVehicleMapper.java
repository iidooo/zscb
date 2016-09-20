package com.edo.zscb.mapper;

import java.util.List;

import com.edo.zscb.model.po.AssetVehicle;

public interface AssetVehicleMapper {
    int deleteByPrimaryKey(Integer vehicleID);

    int insert(AssetVehicle record);

    int insertSelective(AssetVehicle record);

    AssetVehicle selectByPrimaryKey(Integer vehicleID);
    
    /**
     * 通过身份ID获得车辆资产列表
     * @param identityID 身份ID
     * @return 车辆资产列表
     */
    List<AssetVehicle> selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(AssetVehicle record);

    int updateByPrimaryKey(AssetVehicle record);
}
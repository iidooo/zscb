package com.edo.zscb.mapper;

import com.edo.zscb.model.po.AssetVehicle;

public interface AssetVehicleMapper {
    int deleteByPrimaryKey(Integer vehicleID);

    int insert(AssetVehicle record);

    int insertSelective(AssetVehicle record);

    AssetVehicle selectByPrimaryKey(Integer vehicleID);

    int updateByPrimaryKeySelective(AssetVehicle record);

    int updateByPrimaryKey(AssetVehicle record);
}
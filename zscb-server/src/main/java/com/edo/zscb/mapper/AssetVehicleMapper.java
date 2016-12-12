package com.edo.zscb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.edo.zscb.model.po.AssetVehicle;

public interface AssetVehicleMapper {
    int deleteByPrimaryKey(Integer vehicleID);
    
    /**
     * 插入车辆资产对象
     * @param record 车辆资产对象
     * @return 插入操作所影响的行数
     */
    int insert(AssetVehicle record);

    AssetVehicle selectByPrimaryKey(Integer vehicleID);
    
    /**
     * 通过身份ID获得车辆资产列表
     * @param idNumber 身份ID
     * @return 车辆资产列表
     */
    List<AssetVehicle> selectVehicleList(@Param("idNumber")String idNumber, @Param("dataSource")String dataSource);
    
    /**
     * 通过身份ID和车辆License获取车辆资产对象
     * @param idNumber 身份ID
     * @param license 车辆License
     * @return 所获的的车辆资产对象
     */
    AssetVehicle selectAssetVehicle(@Param("idNumber")String idNumber, @Param("license")String license);

    /**
     * 更新车辆资产信息
     * @param record 车辆信息对象
     * @return 更新操作所影响的行数
     */
    int updateByPrimaryKey(AssetVehicle record);
}
package com.edo.zscb.mapper;

import java.util.List;

import com.edo.zscb.model.po.AssetHouse;

public interface AssetHouseMapper {
    int deleteByPrimaryKey(Integer houseID);

    int insert(AssetHouse record);

    int insertSelective(AssetHouse record);

    AssetHouse selectByPrimaryKey(Integer houseID);
    
    /**
     * 通过身份ID获得房产列表
     * @param identityID 身份ID
     * @return 房产列表
     */
    List<AssetHouse> selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(AssetHouse record);

    int updateByPrimaryKey(AssetHouse record);
}
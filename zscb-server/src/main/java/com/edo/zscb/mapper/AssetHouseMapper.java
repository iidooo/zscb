package com.edo.zscb.mapper;

import com.edo.zscb.model.po.AssetHouse;

public interface AssetHouseMapper {
    int deleteByPrimaryKey(Integer houseID);

    int insert(AssetHouse record);

    int insertSelective(AssetHouse record);

    AssetHouse selectByPrimaryKey(Integer houseID);

    int updateByPrimaryKeySelective(AssetHouse record);

    int updateByPrimaryKey(AssetHouse record);
}
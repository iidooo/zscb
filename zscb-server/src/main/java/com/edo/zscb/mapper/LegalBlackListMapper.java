package com.edo.zscb.mapper;

import com.edo.zscb.model.po.LegalBlackList;

public interface LegalBlackListMapper {
    int deleteByPrimaryKey(Integer blackID);

    int insert(LegalBlackList record);

    int insertSelective(LegalBlackList record);

    LegalBlackList selectByPrimaryKey(Integer blackID);

    int updateByPrimaryKeySelective(LegalBlackList record);

    int updateByPrimaryKey(LegalBlackList record);
}
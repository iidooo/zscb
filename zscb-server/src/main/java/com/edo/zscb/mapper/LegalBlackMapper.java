package com.edo.zscb.mapper;

import com.edo.zscb.model.po.LegalBlack;

public interface LegalBlackMapper {
    int deleteByPrimaryKey(Integer blackID);

    int insert(LegalBlack record);

    int insertSelective(LegalBlack record);

    LegalBlack selectByPrimaryKey(Integer blackID);

    int updateByPrimaryKeySelective(LegalBlack record);

    int updateByPrimaryKey(LegalBlack record);
}
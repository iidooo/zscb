package com.edo.dolphin.service;

import com.edo.dolphin.model.DolphinResult;

public interface DolphinService {
    DolphinResult queryZrrKxHonest(Integer operatorID, String name, String idNumber);
}

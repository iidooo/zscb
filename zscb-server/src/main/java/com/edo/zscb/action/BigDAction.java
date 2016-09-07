package com.edo.zscb.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.zscb.model.vo.BigDAccount;
import com.edo.zscb.service.BigDService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.ResponseResult;

@Controller
public class BigDAction {

    private static final Logger logger = Logger.getLogger(BigDAction.class);

    @Autowired
    private BigDService bigDService;

    @ResponseBody
    @RequestMapping(value = { "/bigd/getAccountInfo" }, method = RequestMethod.POST)
    public ResponseResult getAccountInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {

            BigDAccount bigDAccount = bigDService.getAccount();
            // 返回找到的内容对象
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bigDAccount);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}

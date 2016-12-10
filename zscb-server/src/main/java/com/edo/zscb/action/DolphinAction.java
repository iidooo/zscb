package com.edo.zscb.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.dolphin.service.DolphinService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.ResponseResult;

@Controller
public class DolphinAction {
    private static final Logger logger = Logger.getLogger(DolphinAction.class);
    
    @Autowired
    private DolphinService dolphinService;
    
    @ResponseBody
    @RequestMapping(value = { "/dolphin/queryZrrKxHonest" }, method = RequestMethod.POST)
    public ResponseResult queryZrrKxHonest(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String data = dolphinService.queryZrrKxHonest(name, idNumber);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}

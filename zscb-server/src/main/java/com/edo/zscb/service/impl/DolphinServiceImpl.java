package com.edo.zscb.service.impl;

import java.lang.reflect.Proxy;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.ws.security.handler.WSHandlerConstants;
import org.codehaus.xfire.XFireFactory;
import org.codehaus.xfire.client.Client;
import org.codehaus.xfire.client.XFireProxy;
import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.security.wss4j.WSS4JOutHandler;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.codehaus.xfire.util.dom.DOMOutHandler;

import com.edo.dolphin.AppQueryService;
import com.edo.zscb.service.DolphinService;

@org.springframework.stereotype.Service
public class DolphinServiceImpl implements DolphinService {
    
    private static final Logger logger = Logger.getLogger(DolphinServiceImpl.class);
    
    @Override
    public String queryZrrKxHonest(String xm, String zjhm) {
        String result = "";
        try {
            Service srvcModel = new ObjectServiceFactory().create(AppQueryService.class);
            XFireProxyFactory factory = new XFireProxyFactory(XFireFactory.newInstance().getXFire());
            String URL = "http://43.254.149.55:8787/dolphin/serviceEnc";
            // URL = "http://localhost:8080/dolphin/serviceEnc";
            AppQueryService srvc = (AppQueryService) factory.create(srvcModel, URL);
            Client client = ((XFireProxy) Proxy.getInvocationHandler(srvc)).getClient();
            Properties properties = new Properties();
            properties.setProperty(WSHandlerConstants.USER, "ws_security");

            properties.setProperty(WSHandlerConstants.ACTION, WSHandlerConstants.ENCRYPT);
            properties.setProperty(WSHandlerConstants.ENC_PROP_FILE, "com/edo/dolphin/outsecurity_enc.properties");

            String uname = "testAdmin";
            String password = "testPwd";

            WSS4JOutHandler wsOut = new WSS4JOutHandler(properties);
            client.addOutHandler(new DOMOutHandler());
            client.addOutHandler(wsOut);
            String licenseFile = "15033333333";
            String[] param = new String[] { "123" };
            result = srvc.queryZrrKxHonest(xm, zjhm, uname, password, param, licenseFile);
            client.close();
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }

}

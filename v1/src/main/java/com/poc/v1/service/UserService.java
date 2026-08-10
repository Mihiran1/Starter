package com.poc.v1.service;

import com.poc.v1.dto.SignupRequest;
import com.poc.v1.dto.UserResponse;

import com.poc.v1.dto.LoginRequest;
import com.poc.v1.dto.LoginResponse;
import com.poc.v1.dto.VerifyOtpRequest;

public interface UserService {
    UserResponse registerUser(SignupRequest request);
    LoginResponse login(LoginRequest request);
    void verifyOtp(VerifyOtpRequest request);
}

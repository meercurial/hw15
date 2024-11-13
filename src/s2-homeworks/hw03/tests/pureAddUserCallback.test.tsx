import React from "react";
import { pureAddUserCallback, UserType } from "../HW3";

let initialState: UserType[] = [];
const setUsers = (a: React.SetStateAction<UserType[]>) => {
    initialState = Array.isArray(a)
        ? a
        : [...(initialState || []), ...(Array.isArray(a) ? a : [a])];
};

beforeEach(() => {
    initialState = [];
});

test("name 1", () => {
    pureAddUserCallback("name", setUsers, initialState);
    expect(initialState.length).toBe(1);
    expect(initialState[0].name).toBe("name");
    expect(!!initialState[0]._id).toBe(true);
});
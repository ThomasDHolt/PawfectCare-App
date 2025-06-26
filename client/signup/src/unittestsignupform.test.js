import { test, expect, describe } from "vitest";
import { getSignupFormErrors } from "./app";

describe(" getSignupFormErrors function tests", function () {
  test("check an entry", function () {
    const result = getSignupFormErrors(
      "Tatiana",
      "T.maria@outlook.com",
      "ThisIsMyPassword9",
      "ThisIsMyPasswod9"
    );
    const expected = "Passwords do not match";
    expect(result).toBe(expected);
  });
  test("check an entry", function () {
    const result = getSignupFormErrors(
      "",
      "T.maria@outlook.com",
      "ThisIsMyPassword9",
      "ThisIsMyPassword9"
    );
    const expected = "Firstname is required";
    expect(result).toBe(expected);
  });
  test("check an entry", function () {
    const result = getSignupFormErrors(
      "Tatiana",
      "",
      "ThisIsMyPassword9",
      "ThisIsMyPassword9"
    );
    const expected = "Email is required";
    expect(result).toBe(expected);
  });
  test("check an entry", function () {
    const result = getSignupFormErrors(
      "Tatiana",
      "T.maria@outlook.com",
      "",
      ""
    );
    const expected = "Password is required";
    expect(result).toBe(expected);
  });
  test("check an entry", function () {
    const result = getSignupFormErrors(
      "Tatiana",
      "T.maria@outlook.com",
      "ThisIs",
      "ThisIs"
    );
    const expected = "Password must have at least 8 characters";
    expect(result).toBe(expected);
  });
});

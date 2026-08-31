import { describe, expect, it } from "vitest";
import { getApiErrorMessage, parseApiResponse } from "../lib/api/auth";

describe("auth API contract helpers", () => {
    it("extracts successful data from the backend envelope", () => {
        const result = parseApiResponse({
            data: { user: { id: "u_1", email: "owner@example.com" }, context: { workspace: { id: "ws_1" } } },
            requestId: "req_123",
        });

        expect(result).toEqual({
            user: { id: "u_1", email: "owner@example.com" },
            context: { workspace: { id: "ws_1" } },
            requestId: "req_123",
        });
    });

    it("maps backend errors into user-facing messages", () => {
        expect(getApiErrorMessage({ error: { code: "UNAUTHENTICATED", message: "Invalid email or password." } })).toBe("Invalid email or password.");
        expect(getApiErrorMessage({ message: "Network error" })).toBe("Network error");
    });
});

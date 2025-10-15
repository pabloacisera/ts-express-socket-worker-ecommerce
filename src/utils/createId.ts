import { v4 } from "uuid";

export function createId() {
    let id = v4();
    // recortar el id
    let shortId = id.slice(0, 8);
    return shortId;
}
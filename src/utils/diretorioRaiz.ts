import path from "path";

export default path.dirname((process as any).mainModule.filename);

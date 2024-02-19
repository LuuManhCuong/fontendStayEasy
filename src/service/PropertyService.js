import { BaseService } from "./BaseService";

export class PropertyService extends BaseService {
    constructor() {
        super();
    }
    getProperty = () => {
        return this.get("");
    }
    getPropertyById = (id) => {
        return this.get(`/${id}`);
    }

    getPropertyImage = (id) => {
        return this.get(`/images/${id}`);
    }
}

export const propertyService = new PropertyService();
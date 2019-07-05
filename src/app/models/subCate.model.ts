export class SubCategory {
    // constructor(name: string, id: number, cateId: number) {
    //     this.name = name;
    //     this.id = id;
    //     this.cateId = cateId;
    // }

    constructor(response: any) {
        this.name = response.subCategoryName;
        this.id = response.subCategoryID;
        this.cateId = response.categoryID;
    }

    name: string;
    id: number;
    cateId: number
}
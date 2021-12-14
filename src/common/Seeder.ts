import { Repository } from 'typeorm';

export class Seeder {
    constructor(private repository: Repository<any>, dataArray: Array<Object>){
        if (process.env.SEED) {
            dataArray.map(data => {
                this.repository.save(data);
            });
        }
    }
}
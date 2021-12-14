import { ProfessionalType } from '../professional-types/entities/professional-type.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { User } from '../users/entities/user.entity';

export default class TestUtil {
    static getValidUser(): User {
        const user = new User();

        user.id = 1;
        user.name = 'John Doe';
        user.username = 'johndoe';
        user.password = '1OdsXd124TuWvZ';
        user.isActive = true;

        return user;
    }

    static getValidProfessional(): Professional {
        const professional = new Professional();

        professional.id = 1;
        professional.nome = 'John Doe';
        professional.telefone = '(99) 99999-9999';
        professional.email = 'johndoe@email.com';
        professional.tipoDeProfissional = 1;
        professional.situacao = true;

        return professional;
    }

    static getValidProfessionalType(): ProfessionalType {
        const professionalType = new ProfessionalType();
        
        professionalType.id = 1;
        professionalType.descricao = 'Tipo';
        professionalType.situacao = true;

        return professionalType;
    }
}
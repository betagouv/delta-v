import { DeclarationEntity } from '../../../entities/declaration.entity';
import { declarationSerializer, SerializedDeclaration } from '../common/serializer/declarationSerializer';

export interface SerializedGetOneDeclaration {
  declaration: SerializedDeclaration;
}

export default (declaration: DeclarationEntity): SerializedGetOneDeclaration => ({
  declaration: declarationSerializer(declaration),
});

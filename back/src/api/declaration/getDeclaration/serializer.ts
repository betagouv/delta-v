import { DeclarationEntity } from '../../../entities/declaration.entity';
import { declarationSerializer, SerializedDeclaration } from '../../product/common/serializer';

export interface SerializedGetOneDeclaration {
  declaration: SerializedDeclaration;
}

export default (declaration: DeclarationEntity): SerializedGetOneDeclaration => ({
  declaration: declarationSerializer(declaration),
});

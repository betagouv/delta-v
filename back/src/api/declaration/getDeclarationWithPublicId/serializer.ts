import { DeclarationEntity } from '../../../entities/declaration.entity';
import {
  declarationSerializer,
  SerializedDeclaration,
} from '../common/serializer/declarationSerializer';

export interface SerializedGetOneDeclarationWithPublicId {
  declaration: SerializedDeclaration;
}

export default (declaration: DeclarationEntity): SerializedGetOneDeclarationWithPublicId => ({
  declaration: declarationSerializer(declaration),
});
